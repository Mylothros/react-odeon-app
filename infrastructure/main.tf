provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket  = "app-odeon-tf-state"
    key     = "app-odeon.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManageBy    = "Terraform"
    Owner       = "Charalampos Mylothros"
  }
}