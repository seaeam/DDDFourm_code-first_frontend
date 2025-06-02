import type { PaymentStatus } from './fake'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUserStore } from '@/store/userInfo'
import { invoices } from './fake'

const StatusToColor: Record<PaymentStatus, string> = {
  Paid: 'green',
  Pending: 'yellow',
  Unpaid: 'red',
}

function HomePage() {
  const { isLoggedIn } = useUserStore()
  return (
    <div className="container mx-auto py-8 px-4 w-3xl">
      <div className=" rounded-lg border bg-card shadow-sm p-10">
        { !isLoggedIn
          ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )
          : (

              <Table>
                <TableCaption className="text-muted-foreground">A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="w-[100px] font-semibold">Invoice</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Method</TableHead>
                    <TableHead className="text-right font-semibold">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map(invoice => (
                    <TableRow key={invoice.invoice} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>
                        <span className={`
                        inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                        bg-${StatusToColor[invoice.paymentStatus]}-100
                        text-${StatusToColor[invoice.paymentStatus]}-800
                        `}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right font-medium">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-muted/50">
                  <TableRow>
                    <TableCell colSpan={3} className="font-semibold">Total</TableCell>
                    <TableCell className="text-right font-bold text-lg">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ) }
      </div>
    </div>
  )
}

export default HomePage
