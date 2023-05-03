{{/*
Expand the name of the chart.
*/}}
{{- define "guesstimoji.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "guesstimoji.fullname" -}}
{{- if .Values.fullnameOverride }}
    {{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
    {{- $name := default .Chart.Name .Values.nameOverride }}
    {{- if contains $name .Release.Name }}
        {{- .Release.Name | trunc 63 | trimSuffix "-" }}
    {{- else }}
        {{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
    {{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "guesstimoji.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Service spec for each microservice. Accepts `.Values.MICROSERVICE_NAME` as scope. Each microservice must have the below fields defined.
*/}}
{{- define "microservice.Service.spec" -}}
type: {{ .service.type }}
ports:
  - port: {{ .service.port }}
    targetPort: {{ .service.port }}
    name: http
{{- end }}

{{/*
Pod metadata for each microservice. Accepts `.Values.MICROSERVICE_NAME` as scope. Each microservice must have the below fields defined.
*/}}
{{- define "microservice.Deployment.spec.template.metadata" -}}
nodeSelector:
    {{- toYaml .nodeSelector | nindent 2 }}
affinity:
    {{- toYaml .affinity | nindent 2 }}
tolerations:
    {{- toYaml .tolerations | nindent 2 }}
{{- end }}

{{/*
Container values for each microservice. Accepts `.Values.MICROSERVICE_NAME` as scope. Each microservice must have the below fields defined.
*/}}
{{- define "microservice.Deployment.spec.template.containers" -}}
name: {{ .name }}
securityContext:
    {{- toYaml .securityContext | nindent 2 }}
ports:
  - containerPort: {{ .service.port }}
resources:
    {{- toYaml .resources | nindent 2 }}
{{- end }}

{{- define "microservice.Deployment.spec.template.containerProbes" -}}
livenessProbe:
  httpGet:
    path: /
    port: {{ .service.port }}
readinessProbe:
  httpGet:
    path: /
    port: {{ .service.port }}
{{- end }}

{{/*
Game API Selector labels
*/}}
{{- define "guesstimoji.gameApi.selectorLabels" -}}
{{- $microserviceVersion := "" }}
{{- if .Values.image }}
{{- $microserviceVersion = default .Release.Name (.Values.image.tag | toString) }}
{{- else }}
{{- $microserviceVersion = .Release.Name }}
{{- end -}}
app.kubernetes.io/component: api
app.kubernetes.io/name: {{ .Values.gameApi.name }}
app.kubernetes.io/instance: {{ .Values.gameApi.name }}-{{ $microserviceVersion | toString }}
app.kubernetes.io/version: "{{ $microserviceVersion }}"
{{- end }}

{{/*
React App Selector labels
*/}}
{{- define "guesstimoji.reactApp.selectorLabels" -}}
{{- $microserviceVersion := "" }}
{{- if .Values.image }}
{{- $microserviceVersion = default .Release.Name (.Values.image.tag | toString ) }}
{{- else }}
{{- $microserviceVersion = .Release.Name }}
{{- end -}}
app.kubernetes.io/component: api
app.kubernetes.io/name: {{ .Values.reactApp.name }}
app.kubernetes.io/instance: {{ .Values.reactApp.name }}-{{ $microserviceVersion }}
app.kubernetes.io/version: "{{ $microserviceVersion }}"
{{- end }}

{{/*
React App Selector labels
*/}}
{{- define "guesstimoji.graphQlApi.selectorLabels" -}}
{{- $microserviceVersion := "" }}
{{- if .Values.image }}
{{- $microserviceVersion = default .Release.Name (.Values.image.tag | toString ) }}
{{- else }}
{{- $microserviceVersion = .Release.Name }}
{{- end -}}
app.kubernetes.io/component: api
app.kubernetes.io/name: {{ .Values.graphQlApi.name }}
app.kubernetes.io/instance: {{ .Values.graphQlApi.name }}-{{ $microserviceVersion }}
app.kubernetes.io/version: "{{ $microserviceVersion }}"
{{- end }}

{{/*
Microservice labels
*/}}
{{- define "guesstimoji.labels" -}}
helm.sh/chart: {{ include "guesstimoji.chart" . }}
app.kubernetes.io/part-of: {{ include "guesstimoji.name" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/created-by: controller-manager
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "guesstimoji.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "guesstimoji.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
