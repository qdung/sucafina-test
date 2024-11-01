class ProjectsController < ApplicationController
  before_action :set_project, only: [ :show, :update, :destroy ]

  # GET /projects
  def index 
    page = params[:page].to_i || 1
    limit = params[:limit].to_i || 10
    offset = (page - 1) * limit
    @projects = Project.limit(limit).offset(offset)
    render json: { data: @projects, status: "success" }, status: 200        
  end

  # GET /projects/:id
  def show
    render json: @project
  end

  # POST /projects
  def create
    @project = Project.new(project_params)
    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/:id
  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/:id
  def destroy
    begin
      @project.destroy
    rescue Exception => e
       Rails.logger.debug("error #{e}")
    end
  end

  private

  def set_project
    @project = Project.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Project not found" }, status: :not_found
  end

  def project_params
    params.require(:project).permit(:title, :description)
  end
end
