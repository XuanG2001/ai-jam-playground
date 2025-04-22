import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import Piano from './components/Piano'
import DrumPad from './components/DrumPad'
import ControlPanel from './components/ControlPanel'
import Player from './components/Player'
import { InstrumentType } from './types'

function App() {
  const [activeInstrument, setActiveInstrument] = useState<InstrumentType>('piano')
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-jam-primary text-3xl">🎵</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-jam-primary to-purple-300 bg-clip-text text-transparent">
            AI Jam Playground
          </h1>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <Tabs
            defaultValue="piano"
            onValueChange={(value) => setActiveInstrument(value as InstrumentType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="piano">
                <span className="mr-2">🎹</span> 钢琴键盘
              </TabsTrigger>
              <TabsTrigger value="drum">
                <span className="mr-2">🥁</span> 架子鼓
              </TabsTrigger>
            </TabsList>
            <TabsContent value="piano" className="mt-4">
              <Piano />
            </TabsContent>
            <TabsContent value="drum" className="mt-4">
              <DrumPad />
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/3">
          <ControlPanel 
            activeInstrument={activeInstrument}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            setAudioUrl={setAudioUrl}
          />
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="container mx-auto py-4">
          <Player 
            audioUrl={audioUrl} 
            isGenerating={isGenerating}
          />
        </div>
      </footer>
    </div>
  )
}

export default App 