require 'pry'
require 'sinatra'
require 'sinatra/reloader' if development?
require 'yahoofinance'

get '/' do
  if params[:symbol]
    @symbol = params[:symbol].upcase
    @quote = YahooFinance::get_quotes(YahooFinance::StandardQuote, @symbol)[@symbol].lastTrade
  end

  erb :quote
end