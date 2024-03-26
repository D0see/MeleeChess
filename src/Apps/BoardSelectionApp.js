import React, {useState} from 'react'
import StageSelector from '../containers/BoardSelection/StageSelector'

export default function BoardSelectionApp() {
  const[selectedStage, setSelectedStage] = useState(null)

  return (
    <>
      <h1>Select your stage</h1>
      <StageSelector setSelectedStage={setSelectedStage}/> 
      <div class="boardrepresentation">
        {selectedStage.map(num => <p>{num}</p>)}
        <div class="squares grid"> 

          <div>
            Case1
          </div>
          <div>
            Case2
          </div>
          <div>
            Case3
          </div>

        </div>

       </div> 
      <button className="LockStageButton"/>
    </>
  )
}
