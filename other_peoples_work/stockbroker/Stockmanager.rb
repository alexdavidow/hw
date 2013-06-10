class Stockmanager
  attr_accessor :name, :accounts
  def initialize(name)
    @name = name
    @accounts = []
  end

  def add_account(account)
    @accounts << account
  end

  def account_lister
    @accounts.each do |account|
      p account.name
      p account.balance
      p account.portfolios.join(', ')
    end
  end

  def deposit(account_name, deposit)
    @accounts.each do |account|
      if account.name == account_name
        account.balance += deposit
      end
    end
  end
end

class Account
  attr_accessor :name, :balance, :portfolios

  def initialize(client_name, balance, portfolios)
    @name = client_name
    @balance = balance
    @portfolios = portfolios
  end
end
