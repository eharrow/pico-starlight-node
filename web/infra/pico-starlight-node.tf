resource "kubernetes_service" "pico-starlight-node" {
  metadata {
    name      = "pico-starlight-node"
    namespace = "default"
  }

  spec {
    selector = {
      "app" = "pico-starlight-node"
    }
    type = "LoadBalancer"

    port {
      name        = "http"
      port        = 8080
      target_port = "3000"
    }
  }
}


resource "kubernetes_deployment" "pico-starlight-node" {
  metadata {
    labels = {
      "app" = "pico-starlight-node"
    }
    name      = "pico-starlight-node"
    namespace = "default"
  }

  spec {
    replicas = "2"
    selector {
      match_labels = {
        "app" = "pico-starlight-node"
      }
    }

    template {
      metadata {
        labels = {
          "app" = "pico-starlight-node"
        }
        name = "pico-starlight-node"
      }
      spec {
        restart_policy = "Always"
        container {
          image             = "gruffalo1/pico-starlight-node:latest"
          image_pull_policy = "Always"
          name              = "pico-starlight-node"
          port {
            container_port = 3000
            protocol       = "TCP"
          }
          volume_mount {
            mount_path = "/data"
            name       = "volv"
            read_only  = false
          }
        }

        volume {
          name = "volv"

          persistent_volume_claim {
            claim_name = "longhorn-volv-pvc"
            read_only  = false
          }
        }
      }
    }
  }
}

