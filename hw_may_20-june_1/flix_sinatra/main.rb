require 'sinatra'
require 'sinatra/reloader' if development?
require 'pg'
require 'active_support/all'
require 'pry'


# before do 
# 	sql = "select distinct genre from videos"
# 	@nav_rows = run_sql(sql)
# end

get '/' do
	sql = "SELECT * FROM videos"
	@rows = run_sql(sql)
	erb :home
end

post '/create' do
	sql = "INSERT INTO videos (title, description, url, genre) 
	VALUES ('#{params['title']}', '#{params['description']}', '#{params['url']}', '#{params['genre']}')"
	run_sql(sql)
	redirect ('/videos')
end

get '/videos/:id/edit/' do
	sql = "SELECT * FROM videos"
	@rows = run_sql(sql)
	sql = "SELECT * FROM videos WHERE id = #{params['id']}"
	@row = run_sql(sql).first #calling @row rather than @rows b/c single line is being called. 
	erb :edit
end

post '/videos/:id' do 
	sql ="UPDATE videos SET title='#{params['title']}', description='#{params['description']}', url='#{params['url']}', genre='#{params['genre']}' WHERE id=#{params['id']}"
	run_sql(sql)
	redirect to('/videos')
end

post '/videos/:id/delete/' do
	sql = "DELETE FROM videos WHERE ID = #{params['id']}"
	run_sql(sql)
	redirect to('/videos') 
end

get '/videos' do
	sql = "SELECT * FROM videos"
	@rows = run_sql(sql)
	erb :videos
end

get '/videos/:genre' do # :genre passed in as a parameter.
	@rows = run_sql("SELECT * FROM videos WHERE genre='#{params['genre']}'")
	erb :genre

end

def run_sql(sql)
  conn = PG.connect(dbname: 'videos', host: 'localhost')
  result = conn.exec(sql)
  conn.close
  result
end
