import React from 'react'
import IServer from '../../interfaces/Server';
import {useQuery, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import ServerPanelQery from './ServerPanelQery';
import { ERequest } from '../../Enums/App.Enums';

export default function useDeletedServer(){
    const key = 'delete-server';
    return useMutation(
      async (values: {
        id: number|string;
      }) => {
        const {id} = values;
        const result = await ServerPanelQery<IServer>({
          url: `servers/`+ id,
          method: ERequest.DELETE,
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