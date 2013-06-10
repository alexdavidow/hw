require_relative 'Stockmanager'

describe Stockmanager do
  describe '#new' do
    it 'builds a new Stockmanager with a name' do
      stock_manager1 = Stockmanager.new('MyStocks')
      stock_manager1.should be_instance_of Stockmanager
      stock_manager1.name.should == 'MyStocks'
    end
  end

  describe '#add_account' do
    it 'adds an account to stockmanagers account database' do
      stock_manager = Stockmanager.new('MyStocks')
      client_account = Account.new('David', 5000, [])
      stock_manager.add_account(client_account)
      stock_manager.accounts.each do |account|
      account.should be_instance_of Account
      end
    end
  end

  describe '#account_lister' do
    it 'lists all accounts belonging to an instance of Stockmanager' do
      stock_manager = Stockmanager.new('MyStocks')
      client_account = Account.new('David', 5000, [])
      stock_manager.add_account(client_account)
      stock_manager.account_lister
    end
  end

  describe '#deposit' do
    it 'adds funds to the balance of an account' do
      stock_manager = Stockmanager.new('MyStocks')
      client_account = Account.new('David', 5000, [])
      stock_manager.add_account(client_account)
      stock_manager.deposit('David', 100)
    end
  end

  describe Account do
    describe '#new' do
      it 'builds an account with a name' do
        stock_manager = Stockmanager.new('MyStocks')
        client_account = Account.new('David', 5000, [])
        client_account.should be_instance_of Account
        client_account.name.should == 'David'
      end
    end
  end
end
