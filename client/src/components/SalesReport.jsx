import React from 'react'
import Panel from '../components/Panel2'
import Input from '../components/Input'
import Button from '../components/Button'
import ReportEntries from './ReportEntries'


const SalesReport = (props) => {
    const { type, reportInputs, handleInputChangeReports, salesReport, setSalesReport, getSalesReport } = props;
    
    
    return (
        <div className={'w-[50%] h-full flex flex-col justify-between'}>
            <Panel className="h-[48%]" title="Sales Report">
                <div>
                    <div className="mt-[20px]">
                        <Input id="s_start_date" label="Start Date" handleInputChange={handleInputChangeReports} value={reportInputs.s_start_date}/>
                        <Input id="s_end_date" label="End Date" handleInputChange={handleInputChangeReports} value={reportInputs.s_end_date}/>
                    </div>
                    <Button onClick={getSalesReport}>Generate Sales Report</Button>
                </div>
                <ReportEntries data={salesReport} type="sales" />
            </Panel>
        </div>
    )
}

export default SalesReport