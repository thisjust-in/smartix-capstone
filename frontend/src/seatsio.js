new seatsio.SeatingChart({
    divId: 'chart',
    workspaceKey: 'ba650b33-08ea-4845-9c03-8f74fe31c6ce',
    session: 'continue',
    pricing: [
       {'category': 1, 'price': 30}, 
       {'category': 2, 'price': 40}, 
       {'category': 3, 'price': 50}
    ],
    priceFormatter: function(price) {
        return '$' + price;
    }
}).render();
