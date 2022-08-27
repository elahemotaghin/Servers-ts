import React from 'react'
import IServer from '../../interfaces/Server';
import {useQuery, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import ServerPanelQery from './ServerPanelQery';
import { ERequest } from '../../Enums/App.Enums';

export default function useCreateServer(){
    const key = 'create-server';
    return useMutation(
      async (values: {
        name: string;
        detail?: string;
        enable: boolean;
        status: string;
        dataCenter: string;
        tags: any;
      }) => {
        const { name, detail, status, dataCenter, tags, enable } = values;
        const result = await ServerPanelQery<IServer>({
          url: `servers`,
          method: ERequest.POST,
          data: { name, detail, status, dataCenter, tags, enable},
        });
        return result;
      },
      {
        onMutate: (values) => {},
        onSuccess: (result, values) => {},
        onSettled: () => {},
        onError: (error, values, rollback) => {},
      },
    );
}