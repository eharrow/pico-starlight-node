terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
}

variable "kubeconfig" {
  type = string
  default = "~/.kube/config"
  description = "k8s kube config file location"
}

provider "kubernetes" {
  config_path = var.kubeconfig
}