import styled from "@emotion/styled"
import { Box } from "@mui/material"

export const ListContainer = {
  p: 2,
  display: 'block',
  width: '100%'
}

export const Item = {
  width: 400,
  display: 'inline-block',
  marginRight: 2,
  marginBottom: 2,
  verticalAlign: 'top'
}

export enum PipelineStatus {
  oneFailed = 'oneFailed',
  allPassed = 'allPassed'
}

interface ProjectTitle {
  status: PipelineStatus | undefined
}

export const ProjectTitle = styled(Box)<ProjectTitle>`
  background-color: ${(props) => {
    let bg = '';
    switch (props.status) {
      case 'oneFailed':
        bg = '#fed8d8';
      break;
      case 'allPassed':
        bg = '#c1f9c7';
      break;
      default:
        bg = '#dadada';
    }
    return bg;
  }};
  border-radius: 4px 4px 0 0;
  padding: 1em;
  font-size: 24px;
`
