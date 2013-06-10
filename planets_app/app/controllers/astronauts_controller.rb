class AstronautsController < ApplicationController

	def index
		@astronauts = Astronaut.all
	end

	def create
		astronaut = Astronaut.new(params[:astronaut])
		if astronaut.save
			redirect_to astronauts_path
		else
			redirect_to new_astronaut_path
		end
	end

	def new
		@astronaut = Astronaut.new
		@moons = Moon.all
	end

	def edit
		@astronaut = Astronaut.find(params[:id])
		@moons = Moon.all
	end

	def show
		@astronaut = Astronaut.find(params[:id])
	end

	def update
		astronaut = Astronaut.find(params[:id])
		if astronaut.update_attributes(params[:astronaut])
			redirect_to astronauts_path
		else
			redirect_to edit_astronaut_path
		end
	end

	def destroy
		Astronaut.find(params[:id]).delete
		redirect_to astronauts_path
	end
end