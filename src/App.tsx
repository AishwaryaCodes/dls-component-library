import { Accordion, AccordionItem } from './components/Accordion';

function App() {
   return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h1>Accordion Demo - Test</h1>

        <Accordion>  {/*   shouldAllowMultipleExpanded={false} */} 
        <AccordionItem title="Panel one">
          Content for panel one
        </AccordionItem>

        <AccordionItem title="Panel two">
          Content for panel two
        </AccordionItem>

        <AccordionItem title="Panel three">
          Content for panel three
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default App;