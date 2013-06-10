require 'pg'
require 'sinatra'
require 'sinatra/reloader' if development?
require 'active_support/all'

get '/' do
  
  erb :home
end

get '/new' do
  erb :new
end

get '/friends' do
  sql = "SELECT * FROM friendz;"
  @results = run_sql(sql)
  erb :friends
end

  post '/create' do
    name = params[:name]
    age = params[:age]
    gender = params[:gender]
    picture = params[:image]
    twitter = params[:twitter]
    github = params[:github]
    facebook = params[:facebook]
    sql = "INSERT INTO friendz (name, age, gender, image, twitter, github, facebook) VALUES ('#{name}', '#{age}', '#{gender}', '#{picture}', '#{twitter}', '#{github}', '#{facebook}');"
    run_sql(sql)
    redirect '/friends'
  end

  def run_sql(sql)
    conn = PG.connect(:dbname => 'friendz', :host => 'localhost')
    result = conn.exec(sql)
    conn.close
    result
  end
