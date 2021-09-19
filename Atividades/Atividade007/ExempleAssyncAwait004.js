async function getCustomerOrders(customerId) {
 const response = await fetch(`https://api.com/api/customer/${customerId}`)
 const customer = await response.json()

 return await Promise.all(customer.orders.map(async (orderId) => {
   const response = await fetch(`https://api.com/api/order/${orderId}`)
   const orderData = await response.json()
   return orderData.amount
 }))
}
