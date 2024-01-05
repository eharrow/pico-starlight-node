# K8S Service & Deployment Infra using Terraform

The terraform files `web/infra/main.tf web/infra/pico-starlight-node.tf` can be used to create and
tear down the `pico-starlight-node` k8s service and deployment resources. N.B. the persitent volume
`longhorn-volv-pvc` must already exist in the cluster and the `config_path` in `web/infra/main.tf`
must point to a kubeconfig file for the cluster - set this in `web/infra/terraform.tfvars`.

```
terraform init
terraform plan
terraform apply
```

and to tear down

```
terraform destroy
```
