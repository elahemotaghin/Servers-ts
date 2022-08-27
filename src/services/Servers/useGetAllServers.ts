;import React from 'react'
import IServer from '../../interfaces/Server';
import {useQuery, useMutation} from '@tanstack/react-query';
import ServerPanelQery, {IServerPanelResult} from './ServerPanelQery';
import { ERequest } from '../../Enums/App.Enums';

export default function useGetAllServers(){
    return useQuery(
        [`servers`],
        async () => {
          let [getServersRsult] = await getServers();
          let servers: IServer[] = [];
          if (getServersRsult) {
            servers = getServersRsult.result;
          }
          return servers;
        },
        {
          retry: false,
          onSuccess: () => {},
        },
      );
}  

const getServers = (): Promise<[IServerPanelResult<IServer[]>]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const DedicatedServerResult = await ServerPanelQery<IServer[]>({
          url: `servers`,
          method: ERequest.GET,
        });
        resolve([DedicatedServerResult]);
      } catch (error) {
        reject(error);
      }
    });
  };