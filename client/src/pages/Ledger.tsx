import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";

interface Transaction {
  id: string;
  reference_id: string;
  source: string;
  type: string;
  amount: number;
  plan_tier: string;
  affiliate_source: string;
  model: string;
  created_at: string;
  allocated_tithe: number;
  net: number;
}

interface Summary {
  total_gross: number;
  total_tithe: number;
  total_net: number;
}

interface RevenueBySource {
  source: string;
  total_revenue: number;
}

const Ledger: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [titheAccumulation, setTitheAccumulation] = useState<{ total_tithe_accumulation: number } | null>(null);
  const [revenueBySource, setRevenueBySource] = useState<RevenueBySource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, summaryRes, titheRes, revenueRes] = await Promise.all([
          fetch('/api/ledger/transactions'),
          fetch('/api/ledger/summary'),
          fetch('/api/ledger/tithe'),
          fetch('/api/ledger/revenue-by-source'),
        ]);

        if (!transactionsRes.ok) throw new Error(`HTTP error! status: ${transactionsRes.status} for transactions`);
        if (!summaryRes.ok) throw new Error(`HTTP error! status: ${summaryRes.status} for summary`);
        if (!titheRes.ok) throw new Error(`HTTP error! status: ${titheRes.status} for tithe`);
        if (!revenueRes.ok) throw new Error(`HTTP error! status: ${revenueRes.status} for revenue by source`);

        const transactionsData = await transactionsRes.json();
        const summaryData = await summaryRes.json();
        const titheData = await titheRes.json();
        const revenueBySourceData = await revenueRes.json();

        setTransactions(transactionsData);
        setSummary(summaryData);
        setTitheAccumulation(titheData);
        setRevenueBySource(revenueBySourceData);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch ledger data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading ledger data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Triumvirate Ledger</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gross</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary?.total_gross?.toFixed(2) || '0.00'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tithe (War Chest)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${titheAccumulation?.total_tithe_accumulation?.toFixed(2) || '0.00'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Net</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary?.total_net?.toFixed(2) || '0.00'}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueBySource.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.source}</TableCell>
                  <TableCell className="text-right">${item.total_revenue?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Net</TableHead>
                <TableHead>Tithe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant="secondary">{tx.source}</Badge></TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>${tx.amount?.toFixed(2)}</TableCell>
                  <TableCell>${tx.net?.toFixed(2)}</TableCell>
                  <TableCell>${tx.allocated_tithe?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ledger;
