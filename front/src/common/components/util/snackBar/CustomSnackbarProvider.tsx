'use client';

import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

const CustomSnackbarProvider = ({ children }: Props) => {
  return (<SnackbarProvider
    Components={{
      default: StyledMaterialDesignContent,
      info: StyledMaterialDesignContent,
      success: StyledMaterialDesignContent,
      error: StyledMaterialDesignContent,
    }}
    anchorOrigin={{
      // vertical: `${isMobile ? 'bottom' : 'top'}`,
      vertical: 'top',
      horizontal: 'right',
    }}
    maxSnack={1}
    autoHideDuration={2000}
    preventDuplicate={true}
  >
    {children}
  </SnackbarProvider>);
}

export default CustomSnackbarProvider;

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: 'whitesmoke',
    color: 'rgb(88, 88, 88)',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: '#8EBCDB',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: '#83c6b6',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#dc7889',
    fontWeight: '500'
  },
}));