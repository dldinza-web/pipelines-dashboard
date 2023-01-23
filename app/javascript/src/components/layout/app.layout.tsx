import React from 'react'
import { AppLayoutProps } from './app.layout.props'

const AppLayout = (props: AppLayoutProps) => {
  return (
    <>
      <header>{props.title}</header>
      <div>
        {props.children}
      </div>
    </>
  )
}

export default AppLayout
