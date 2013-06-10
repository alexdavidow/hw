class SolarSystemsController < ApplicationController
	def index
		@solar_systems = SolarSystem.all
	end

	def create
		solar_system = SolarSystem.new(params[:solar_system])
		if solar_system.save
			redirect_to solar_systems_path
		else
			redirect_to new_solar_system_path
		end
	end

	def new
		@solar_system = SolarSystem.new
		@moons = Moon.all
	end

	def edit
		@solar_system = SolarSystem.find(params[:id])
		@moons = Moon.all
	end

	def show
		@solar_system = SolarSystem.find(params[:id])
	end

	def update
		solar_system = SolarSystem.find(params[:id])
		if solar_system.update_attributes(params[:solar_system])
			redirect_to solar_systems_path
		else
			redirect_to edit_solar_system
		end
	end

	def destroy
		SolarSystem.find(params[:id]).delete
		redirect_to solar_systems_path
	end

end