PlanetsApp::Application.routes.draw do

  root :to => 'home#index'

  resources :solar_systems
  resources :moons
  resources :astronauts
end
