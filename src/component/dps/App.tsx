import React from 'react';
import { useOverlayPluginApi } from '../../hooks/useActApi/useOverlayPluginApi';
import { AlignContainer } from './AlignContainer';
import { OverLayContainer } from './OverLayContainer';
import { TranslationProvider } from './TranslationProvider';

export const App: React.VFC<{}> = () =>
    <TranslationProvider>
        <AlignContainer>
            <OverLayContainer useActApi={useOverlayPluginApi} />
        </AlignContainer>
    </ TranslationProvider>;