import React from 'react';
import { useOverlayPluginApi } from '../../hooks/useActApi/useOverlayPluginApi';
import { AlignContainer } from './AlignContainer';
import { OverLayContainer } from './OverLayContainer';

export const App: React.VFC<{}> = () =>
    <AlignContainer>
        <OverLayContainer useActApi={useOverlayPluginApi} />
    </AlignContainer>;