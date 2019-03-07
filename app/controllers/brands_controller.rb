class BrandsController < ApplicationController
  before_action :set_brand, only: [:show, :update, :destroy]

  def index
    @brands = Brand.all
  end

  def show
  end

  def form
    @brand = Brand.new
    render partial: 'form'
  end

  def create
    @brand = Brand.new(brand_params)
    if @brand.save
      render json: @brand
    else
      render_error(@brand)
    end
  end

  def update
    if @brand.update(brand_params)
      render json: @brand
    else
      render_error(@brand)
    end
  end

  def destroy
    @brand.destroy
    render json: { message: 'remove' }, status: :ok
  end

  private
  def set_brand
    @brand = Brand.find(params[:id])
  end

  def brand_params
    params.require(:brand).permit(:name, :location)
  end
end
