require_relative 'stock_market'


describe Broker do
  describe '#new' do
    it 'builds a new brokerage with a name' do
      broker = Broker.new('AlexAssets')
      broker.should be_instance_of Broker
      broker.name.should == 'AlexAssets'
    end

    describe '#open_account' do
      it 'opens a new account' do
        broker = Broker.new('AlexAssets')
        account = Account.new('asd', broker, 1000)
        account.should be_instance_of Account
        account.name.should == 'asd'
      end
    end

    describe Account do
      describe '#new' do
        it 'opens a new account under broker' do
          broker = Broker.new('AlexAssets')
          account = Account.new('asd', broker, 1000)
          account.should be_instance_of Account
          account.name.should == 'asd'
        end
      end

      it 'has an initial balance' do
        broker = Broker.new('AlexAssets')
        account = Account.new('asd', broker, 1000)
        account.should be_instance_of Account
        account.name.should == 'asd'
        asd_account = broker.open_account('asd', 1000)
        asd_account.balance.should == 1000
      end

      # it 'opens two accounts' do
      #  broker = Broker.new('AlexAssets')
      #  account1 = broker.open_account('asd', 1000)
      #  account2 = broker.open_account('omar', 500)
      #  broker.accounts.size.should == 2
      # end


      describe '#deposit' do
        it 'adds money to account' do
          account = Account.new('asd', broker, 1000)
          account.should be_instance_of Account
          account.name.should == 'asd'
          asd_account = broker.open_account('asd', 1000)
          asd_account.balance.should == 1000
          account.deposit('asd', 3000)
          asd_account.balance.should == 4000
        end
      end

      describe Portfolio do
        describe '#new' do
          it 'creates a new portfolio of stocks for an account' do
            port_1 = Portfolio.new('Stocks', account)
            port_1.should be_instance_of Portfolio
            port_1.name.should == 'Stocks'
          end
        end

        describe '#get_quote' do
          it 'gets a quote for any symbol' do
            port_1 = Portfolio.new('Stocks', account)
            port_1.should be_instance_of Portfolio
            port_1.name.should == 'Stocks'
            # how do i describe this action?
          end
        end

        # describe '#buy_stock' do
        #   it 'adds a stock to portfolio' do
        #     broker = Broker.new('AlexAssets')
        #     account = Account.new('asd', broker, 1000)
        #     port_1 = Portfolio.new('Stocks', account)
        #     port_1.should be_instance_of Portfolio
        #     port_1.name.should == 'Stocks'
        #     port_1.buy_stock(quote_symbols).should == "#{qt.symbol}"
        #   end
        # end

        # describe '#sell_stock' do
        #   it 'removes a stock from portfolio' do
        #     broker = Broker.new('AlexAssets')
        #     account = Account.new('asd', broker, 1000)
        #     port_1 = Portfolio.new('Stocks', account)
        #     port_1.should be_instance_of Portfolio
        #     port_1.name.should == 'Stocks'
        #     port_1.sell_stock(quote_symbols).should == (Portfolio -= 1)
        #   end
        # end
      end
    end
  end
end
