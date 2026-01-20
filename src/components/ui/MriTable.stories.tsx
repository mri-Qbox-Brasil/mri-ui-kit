import type { Meta, StoryObj } from '@storybook/react';
import {
  MriTable,
  MriTableBody,
  MriTableCaption,
  MriTableCell,
  MriTableFooter,
  MriTableHead,
  MriTableHeader,
  MriTableRow,
} from './MriTable';

const meta: Meta<typeof MriTable> = {
  title: 'UI/MriTable',
  component: MriTable,
  tags: ['autodocs'],
};

export default meta;

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export const Default: StoryObj<typeof MriTable> = {
  render: () => (
    <MriTable>
      <MriTableCaption>A list of your recent invoices.</MriTableCaption>
      <MriTableHeader>
        <MriTableRow>
          <MriTableHead className="w-[100px]">Invoice</MriTableHead>
          <MriTableHead>Status</MriTableHead>
          <MriTableHead>Method</MriTableHead>
          <MriTableHead className="text-right">Amount</MriTableHead>
        </MriTableRow>
      </MriTableHeader>
      <MriTableBody>
        {invoices.map((invoice) => (
          <MriTableRow key={invoice.invoice}>
            <MriTableCell className="font-medium">{invoice.invoice}</MriTableCell>
            <MriTableCell>{invoice.paymentStatus}</MriTableCell>
            <MriTableCell>{invoice.paymentMethod}</MriTableCell>
            <MriTableCell className="text-right">{invoice.totalAmount}</MriTableCell>
          </MriTableRow>
        ))}
      </MriTableBody>
      <MriTableFooter>
        <MriTableRow>
          <MriTableCell colSpan={3}>Total</MriTableCell>
          <MriTableCell className="text-right">$2,500.00</MriTableCell>
        </MriTableRow>
      </MriTableFooter>
    </MriTable>
  ),
};
