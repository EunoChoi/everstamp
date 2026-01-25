'use client';

import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components"; // createGlobalStyle 추가

interface Props {
  children?: ReactNode;
}

const CustomSnackbarProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      Components={{
        default: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={1}
      autoHideDuration={2000}
      preventDuplicate={true}
    >
      <GlobalSnackbarStyle />
      {children}
    </SnackbarProvider>
  );
}

export default CustomSnackbarProvider;

const GlobalSnackbarStyle = createGlobalStyle`
  .notistack-SnackbarContainer {
    z-index: 999999 !important; /* 모달보다 확실히 높은 값 */
  }
`;

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    color: 'rgb(88, 88, 88)',
    fontWeight: '500',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: 'rgba(142, 188, 219, 0.95)',
    backdropFilter: 'blur(20px)',
    fontWeight: '500',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: 'rgba(131, 198, 182, 0.95)',
    backdropFilter: 'blur(20px)',
    fontWeight: '500',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: 'rgba(220, 120, 137, 0.95)',
    backdropFilter: 'blur(20px)',
    fontWeight: '500',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));