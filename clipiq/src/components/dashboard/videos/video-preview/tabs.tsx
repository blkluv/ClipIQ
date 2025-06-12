import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
type props={
    defaultValue:string,
    triggers: string[]
  children: React.ReactNode
}
const TabMenu = ({ defaultValue, triggers,children }: props) => {
  return (
    <Tabs
    defaultValue={defaultValue}
      className="w-full">
        <TabsList className="flex justify-start bg-transparent">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className="p-1.5 rounded-lg capitalize text-base data-[state=active]:bg-[#1D1D1D]"
          >
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
    
  )
}

export default TabMenu
