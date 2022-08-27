import React from 'react'
import IServer from '../../interfaces/Server';
import {useQuery} from '@tanstack/react-query';
import ServerPanelQery, {IServerPanelResult} from './ServerPanelQery';
import { ERequest } from '../../Enums/App.Enums';

export default function useGetServerById(id:string){
    return useQuery(
        [`server`],
        async () => {
          let [getServersRsult] = await getServers(id);
          let server: IServer = getServersRsult?.result;
          return server;
        },
        {
          retry: false,
          onSuccess: () => {},
        },
      );
}  

const getServers = (id:string): Promise<[IServerPanelResult<IServer>]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const DedicatedServerResult = await ServerPanelQery<IServer>({
          url: `servers/` + id,
          method: ERequest.GET,
        });
        resolve([DedicatedServerResult]);
      } catch (error) {
        reject(error);
      }
    });
  };