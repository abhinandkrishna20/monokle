import * as k8s from '@kubernetes/client-node';
import {ResourceKindHandler} from '@models/resourcekindhandler';

const ClusterRoleBindingHandler: ResourceKindHandler = {
  kind: 'ClusterRoleBinding',
  apiVersionMatcher: '*',
  description: '',
  getResourceFromCluster(kubeconfig: k8s.KubeConfig, name: string): Promise<any> {
    const k8sCoreV1Api = kubeconfig.makeApiClient(k8s.RbacAuthorizationV1Api);
    return k8sCoreV1Api.readClusterRoleBinding(name);
  },
  async listResourcesInCluster(kubeconfig: k8s.KubeConfig) {
    const k8sRbacV1Api = kubeconfig.makeApiClient(k8s.RbacAuthorizationV1Api);
    const response = await k8sRbacV1Api.listClusterRoleBinding();
    return response.body.items;
  },
  outgoingRefMappers: [
    {
      source: {
        path: ['roleRef', 'name'],
      },
      target: {
        kind: 'ClusterRole',
        path: ['metadata', 'name'],
      },
    },
  ],
};

export default ClusterRoleBindingHandler;
