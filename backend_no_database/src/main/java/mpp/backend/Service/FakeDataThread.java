package mpp.backend.Service;

import mpp.backend.Controller.ComputerComponentController;
import mpp.backend.Model.ComputerComponent;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope
public class FakeDataThread extends Thread{
    ComputerComponentController controller;
    int sleepTimeMilliseconds;
    boolean keepRunning;

    public FakeDataThread(){
        this.sleepTimeMilliseconds = 1000;
        this.keepRunning = true;
    }

    public FakeDataThread(int sleepTimeMilliseconds){
        this.sleepTimeMilliseconds = sleepTimeMilliseconds;
        this.keepRunning = true;
    }

    public void setController(ComputerComponentController controller){
        this.controller = controller;
    }

    @Override
    public void run(){
        try{
            while(keepRunning){
                ComputerComponent faked = DomainFaker.generateConvincingComputerComponent();
                controller.insertComponent(faked);
                sleep(sleepTimeMilliseconds);
            }
        }catch(Exception error){
            throw new RuntimeException(error.getMessage());
        }
    }

    public void stopGenerator(){
        keepRunning = false;
    }
}
