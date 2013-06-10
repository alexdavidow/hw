load 'stock_market.rb'
b1 = Broker.new("alexassets")
b1.open_account("asd", 1000)
a1 = b1.accounts[0]
b1.open_account("dylan", 10000)
a2 = b1.accounts[1]
a1.open_portfolio("alport")
alport = a1.portfolios[0]
alport.buy_stock("IBM", 1)