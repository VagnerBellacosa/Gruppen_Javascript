async function printCustomer(customerId){
 //lógica fictícia da função
}

async function getAndPrintAllCustomers() {
 const sql = 'SELECT id FROM customers'
 const customers = await db.query(sql, [])
 for (const customer of customers) {
   await printCustomer(customer.id)
 }
}
