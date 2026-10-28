#!/bin/sh
# Certificates and cost for one import. Without CBAM_API_KEY, 3 calls a day per address.
set -eu
CN=${1:-72083900}
ORIGIN=${2:-IN}
TONNES=${3:-1000}
YEAR=${4:-2026}

curl -fsS ${CBAM_API_KEY:+-H "Authorization: Bearer $CBAM_API_KEY"} \
  "https://cbamdata.eu/v1/resolve?cn=$CN&origin=$ORIGIN&tonnes=$TONNES&year=$YEAR" |
  jq '{inScope: .data.inScope, certificates: .data.certificates, costEur: .data.cost, dataVersion: .meta.dataVersion}'
