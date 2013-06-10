require 'yahoofinance'
last_trade =e_type = YahooFinance::StandardQuote
quote_symbol = "DIS"

# puts YahooFinance::get_quotes( quote_type, quote_symbol )[quote_symbol]
last_trade = YahooFinance::get_quotes( quote_type, quote_symbol )[quote_symbol].lastTrade




# broker = Broker.new('AlexAssets')
# account = Account.new('asd', broker)