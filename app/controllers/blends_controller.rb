class BlendsController < ApplicationController
  before_action :set_brand
  before_action :set_blend, only: [:show, :update, :destroy]

  def index
    render json: @brand.blends
  end

  def show
    render json: @blend
  end

  def create
    @blend = @brand.blends.new(blend_params)
    if @blend.save
      render json: @blend
    else
      render_error(@blend)
    end
  end

  def update
    if @blend.update(blend_params)
      render json: @blend
    else
      render_error(@blend)
    end
  end

  def destroy
    @blend.destroy
    render json: { message: 'removed' }, status: :ok
  end

  private
  def set_brand
    @brand = Brand.find(params[:brand_id])
  end

  def set_blend
    @blend = Blend.find(params[:id])
  end

  def blend_params
    params.require(:blend).permit(:name, :notes)
  end
end
