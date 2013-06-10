require 'yahoofinance'

class Broker
  attr_accessor :name, :accounts

  def initialize(name)
    @name = name
    @accounts = []
  end

  def open_account(account_name, balance)
    new_account = Account.new(account_name, self, balance)
    @accounts << new_account
    new_account
  end
end

class Account
  attr_accessor :name, :broker, :balance, :portfolios

  def initialize(name, broker, balance)
    @name = name
    @broker = broker
    @balance = balance
    @portfolios = []
  end

  def deposit(account_name, amount)
    @accounts.each do |account|
      if account[:name] == account_name
        account[:balance] += amount
      end
    end
  end

  def open_portfolio(portfolio_name)
    new_portfolio = Portfolio.new(portfolio_name, self)
    @portfolios << new_portfolio
    new_portfolio
  end
end

class Portfolio
  attr_accessor :name, :account, :stocks

  def initialize(name, account)
    @name = name
    @account = account
    @stocks ={}
  end

  def self.get_quote(stock_symbol)
    last_trade = YahooFinance::get_quotes(YahooFinance::StandardQuote, stock_symbol)[stock_symbol].lastTrade
  end

  def buy_stock(stock_symbol, stock_quantity)
    current_quote = Portfolio.get_quote(stock_symbol)
    current_total_price = current_quote * stock_quantity
    account.balance = account.balance - current_total_price if account.balance >= current_total_price
    account.balance
    if @stocks[stock_symbol]
      @stocks[stock_symbol] += stock_quantity 
    else
      @stocks[stock_symbol] = stock_quantity
    end
  end

  def sell_stock(stock_symbol, stock_quantity)
    current_quote = Portfolio.get_quote(stock_symbol)
    current_total_price = current_quote * stock_quantity
    account.balance = account.balance + current_total_price
    @stocks.delete(stock_symbol) # deletes the key-value pair for that stock. Assumes all shares are sold. #alternative: @stocks[stock_name] -= stock_quantity
  end

  def portfolio_lister
    puts @stocks.each
  end
end
