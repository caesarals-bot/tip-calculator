import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder : () => void 
}

export const OrderTotals = ({order, tip, placeOrder}:OrderTotalsProps) => {

    const subtotalAmount = useMemo(() =>
        order.reduce((total, item) => total + (item.quantity * item.price), 0)  
        ,[order])
    
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])

    const total = useMemo(() => subtotalAmount + tipAmount, [subtotalAmount, tipAmount])
    return (
        <>
            <div className="space-y-3">
                <h2>Totales y Propina:</h2>
                <p>
                    <span className="font-bold">Subtotal:</span>{ formatCurrency(subtotalAmount)}
                </p>
                <p>
                    <span className="font-bold">Propina:</span> { formatCurrency(tipAmount)}
                </p>
                <p>
                    <span className="font-bold">Total:</span> { formatCurrency(total)}
                </p>
                
            </div>
            <button 
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={total === 0}
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}
