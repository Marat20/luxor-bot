interface MakersProps {
  wallet: string;
  startTransaction: string;
  finishTransaction: string;
}

export const getMakers = (makers: MakersProps) => `{
    getTokenEvents(direction: ASC, query:{ address: "${makers.wallet}", networkId: 1, timestamp: {from:${makers.startTransaction}, to: ${makers.finishTransaction}}}, limit: 1000000000) {
      items {
        maker
      }
      }
    }`;
