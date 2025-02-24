import React, { useEffect } from "react"
import "../style.css"
import SupplyMarketRow from "./supplyMarketRow"
import {compareSymbol, compareLiquidity, compareHndAPR} from "../../../helpers"
import { GeneralDetailsData } from "../../../Classes/generalDetailsClass"
import { BigNumber } from "../../../bigNumber"
import { CTokenInfo } from "../../../Classes/cTokenClass"
import ReactTooltip from "react-tooltip"

interface Props{
  generalData: GeneralDetailsData | null,
  marketsData: (CTokenInfo | null)[] | null | undefined,
  enterMarketDialog: (market: CTokenInfo) => void,
  supplyMarketDialog: (market: CTokenInfo) => void,
  more: boolean,
  darkMode: boolean,
}

const SupplyMarket: React.FC<Props> = (props : Props) => {
  useEffect(() =>{
    ReactTooltip.rebuild()
  })
    
    return (
        <div className="market-content">
          <ReactTooltip place="top" effect="solid" backgroundColor={`${props.darkMode ? "#f9fafb" : ""}`} textColor={`${props.darkMode ? "#101010" : ""}`}/>
            <table className = "market-table">
            <thead className="market-table-header">
                <tr>
                    <th>Asset</th>
                    <th>APY</th>
                    <th>Supplied</th>
                    <th>Wallet</th>
                    <th>Collateral</th>
                </tr>
            </thead>
            <tbody className="market-table-content">
                {props.generalData?.totalSupplyBalance?.gt(BigNumber.from("0")) && (
                    <tr>
                      <td
                        style={{
                          fontSize: "80%",
                          fontWeight: "bold",
                          padding: "1px 0px 1px 15px",
                        }}
                      >
                        Supplying
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                  {props.marketsData?.filter((item) => item?.supplyBalance?.gt(BigNumber.from("0")))
                    .sort(compareSymbol).sort(compareLiquidity).sort(compareHndAPR)
                    .map((details, index) => (
                      <SupplyMarketRow
                          key={index}
                          tooltip={`supply-${index}`}
                          details={details}
                          enterMarketDialog={props.enterMarketDialog}
                          supplyMarketDialog={props.supplyMarketDialog}
                      />
                    ))}
                  {props.generalData?.totalSupplyBalance.gt(BigNumber.from("0")) && (
                    <tr>
                      <td
                        style={{
                          fontSize: "80%",
                          fontWeight: "bold",
                          padding: "1px 0px 1px 15px",
                        }}
                      >
                        Other Markets
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                  {props.marketsData?.filter((item) => item?.supplyBalance?.lte(BigNumber.from("0")))
                    .sort(compareSymbol).sort(compareLiquidity).sort(compareHndAPR)
                    .map((details, index) => {
                      if(props.more || (!props.more && index < 6)) 
                        return (
                          <SupplyMarketRow
                              key={index}
                              tooltip={`not-supply-${index}`}
                              details={details}
                              enterMarketDialog={props.enterMarketDialog}
                              supplyMarketDialog={props.supplyMarketDialog}
                          />
                        )
                      else return null
                  })}
            </tbody>
        </table>
        </div>
    )
}

export default SupplyMarket