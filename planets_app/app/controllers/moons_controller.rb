class MoonsController < ApplicationController

	def index
		@moons = Moon.all
	end

	def create
		moon = Moon.new(params[:moon])
		if moon.save
			redirect_to moons_path
		else
			redirect_to new_moon_path
		end
	end

	def new
		@moon = Moon.new
	end

	def edit
		@moon = Moon.find(params[:id])
	end

	def show
		@moon = Moon.find(params[:id])
	end

	def update
		moon = Moon.find(params[:id])
		if moon.update_attributes(params[:moon])
			redirect_to moons_path
		else
			redirect_to edit_moon_path
		end
	end

	def destroy
		Moon.find(params[:id]).delete
		redirect_to moons_path
	end
end