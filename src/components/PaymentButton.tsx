import { useState } from 'react'
import axios from 'axios'

interface PaymentButtonProps {
  amount: string
  description: string
}

export default function PaymentButton({ amount, description }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePay = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:4000/api/create-payment', {
        amount,
        description,
      })

      // редиректим на ЮKassa
      window.location.href = data.confirmation.confirmation_url
    } catch (e) {
      console.error(e)
      alert('Ошибка при создании платежа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button className="purchase-btn" onClick={handlePay} disabled={loading}>
      {loading ? 'Создание платежа...' : 'Приобрести'}
    </button>
  )
}
