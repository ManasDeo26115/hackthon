import { Trip, Expense, VaultContribution, User, SettlementTransaction } from '../types';

export interface MemberFinancialSummary {
  user: User;
  totalPaidDirectly: number;
  totalVaultContributed: number;
  totalExpenseShare: number;
  netBalance: number; // positive = receives, negative = owes
}

/**
 * Computes financial summary for each member in a trip.
 */
export function calculateMemberFinancials(
  trip: Trip,
  expenses: Expense[],
  vaultContributions: VaultContribution[]
): {
  summaries: MemberFinancialSummary[];
  totalSpent: number;
  vaultTotalContributions: number;
  vaultExpensesTotal: number;
  vaultBalance: number;
  settlements: SettlementTransaction[];
} {
  const summariesMap = new Map<string, MemberFinancialSummary>();

  // Initialize summary map for all members
  trip.members.forEach((member) => {
    summariesMap.set(member.id, {
      user: member,
      totalPaidDirectly: 0,
      totalVaultContributed: 0,
      totalExpenseShare: 0,
      netBalance: 0,
    });
  });

  let totalSpent = 0;
  let vaultExpensesTotal = 0;

  // Process all expenses for the active trip
  expenses.forEach((expense) => {
    if (expense.tripId !== trip.id) return;

    totalSpent += expense.amount;

    if (expense.isVaultPaid) {
      vaultExpensesTotal += expense.amount;
      // If paid from vault, direct payer does not get credit, but share still applies to applicable members!
    } else {
      // Direct payment credit to paidBy user
      const payerSummary = summariesMap.get(expense.paidBy);
      if (payerSummary) {
        payerSummary.totalPaidDirectly += expense.amount;
      }
    }

    // Allocate expense share to applicable members
    if (expense.appliesTo && expense.appliesTo.length > 0) {
      const share = expense.amount / expense.appliesTo.length;
      expense.appliesTo.forEach((userId) => {
        const memberSummary = summariesMap.get(userId);
        if (memberSummary) {
          memberSummary.totalExpenseShare += share;
        }
      });
    }
  });

  let vaultTotalContributions = 0;
  // Process vault contributions
  vaultContributions.forEach((contrib) => {
    if (contrib.tripId !== trip.id) return;
    vaultTotalContributions += contrib.amount;
    const contributorSummary = summariesMap.get(contrib.userId);
    if (contributorSummary) {
      contributorSummary.totalVaultContributed += contrib.amount;
    }
  });

  const vaultBalance = vaultTotalContributions - vaultExpensesTotal;

  // Calculate Net Balance for each member
  // Net Balance = (totalPaidDirectly + totalVaultContributed) - totalExpenseShare
  const summaries: MemberFinancialSummary[] = Array.from(summariesMap.values()).map((summary) => {
    const netBalance = summary.totalPaidDirectly + summary.totalVaultContributed - summary.totalExpenseShare;
    return {
      ...summary,
      netBalance: Math.round(netBalance),
    };
  });

  // Calculate simplified settlement list ("Who Owes Whom")
  const settlements = calculateOptimalSettlements(summaries);

  return {
    summaries,
    totalSpent,
    vaultTotalContributions,
    vaultExpensesTotal,
    vaultBalance,
    settlements,
  };
}

/**
 * Minimizes transaction count between debtors and creditors using a greedy balance matching algorithm.
 */
function calculateOptimalSettlements(summaries: MemberFinancialSummary[]): SettlementTransaction[] {
  // Separate into debtors (netBalance < 0) and creditors (netBalance > 0)
  const debtors = summaries
    .filter((s) => s.netBalance < -1)
    .map((s) => ({ user: s.user, amount: Math.abs(s.netBalance) }))
    .sort((a, b) => b.amount - a.amount);

  const creditors = summaries
    .filter((s) => s.netBalance > 1)
    .map((s) => ({ user: s.user, amount: s.netBalance }))
    .sort((a, b) => b.amount - a.amount);

  const transactions: SettlementTransaction[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const settledAmount = Math.min(debtor.amount, creditor.amount);

    if (settledAmount > 0) {
      transactions.push({
        id: `settle-${debtor.user.id}-${creditor.user.id}-${Math.random().toString(36).substr(2, 4)}`,
        fromUser: debtor.user,
        toUser: creditor.user,
        amount: Math.round(settledAmount),
      });
    }

    debtor.amount -= settledAmount;
    creditor.amount -= settledAmount;

    if (debtor.amount < 1) i++;
    if (creditor.amount < 1) j++;
  }

  return transactions;
}
