package CalculatorProject;
import java.awt.Dimension;
// import java.awt.FlowLayout; replaced by gridLayout model
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;
public class Calculator extends JFrame implements ActionListener 

{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
  JButton sumb,mulb,divb,subb,remndrb,sineb,cosineb,tanb,log10,loge,e_power_x,a_power_x,squareroot,inverseb;
  JTextField fielda,fieldb,fieldr;
   JLabel labela,labelb,labelr;
public static void main(String[] args) 
{  Calculator calc=new Calculator();
   calc.setVisible(true);
   Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
   int width = screenSize.height;
   int height = screenSize.width;
//   calc.setSize(width-10,height-5);
   calc.setSize(height,width);
   calc.setLocation(0,0);
   calc.setLayout(new GridLayout(3,3));
 }
public Calculator()
{  setLayout(null);
	sumb=new JButton("SUM");
  divb=new JButton("DIVIDE");
  mulb=new JButton("MULTIPLY");
  labela=new JLabel("ENTER A");
  labelb=new JLabel("ENTER B");
  labelr=new JLabel("RESULT");
  subb=new JButton("subtract");
  remndrb=new JButton("remainder");
  inverseb=new JButton("1/x");
  cosineb=new JButton("cosine");
  sineb=new JButton("sine");
  e_power_x=new JButton("e^x");
  a_power_x=new JButton("a^x");
  tanb=new JButton("tan");
  squareroot=new JButton("x^(1/2)");
  log10=new JButton("log 10");
  loge=new JButton("log e");
  fielda=new JTextField(10);//by default it is 10
  fieldb=new JTextField(10);//by default it is 10
  fieldr=new JTextField(10);//by default it is 10
  add(labela);
  add(fielda);add(labelb);
  add(fieldb);add(labelr); add(fieldr);
  add(sumb);
 add(mulb); 
 add(divb); 
 add(subb);
 add(remndrb);
 add(sineb);
 add(cosineb);
 add(tanb);
 add(log10);
 add(loge);
 add(a_power_x);
 add(e_power_x);
 add(inverseb);
 add(squareroot);
 
 
// sumb.setBounds(260,10,5,5);
//
// mulb.setBounds(267,10,5,5);
//
// divb.setBounds(274,10,5,5);
//
// subb.setBounds(281,10,5,5);
//
// remndrb.setBounds(287,10,5,5);
//
// cosineb.setBounds(294,10,5,5);
//
// sineb.setBounds(301,10,5,5);
//
// tanb.setBounds(308,10,5,5);
//
// e_power_x.setBounds(315,10,5,5);
//
// a_power_x.setBounds(322,10,5,5);
//
// loge.setBounds(329,10,5,5);
//
// log10.setBounds(336,10,5,5);
//
//
// squareroot.setBounds(343,10,5,5);
// 
//
// inverseb.setBounds(350,10,5,5);
 
 sumb.addActionListener(this);
 mulb.addActionListener(this);
 divb.addActionListener(this);
 subb.addActionListener(this);
 remndrb.addActionListener(this);

 log10.addActionListener(this);

 loge.addActionListener(this);

 squareroot.addActionListener(this);

 e_power_x.addActionListener(this);

 inverseb.addActionListener(this);
 a_power_x.addActionListener(this);
 
}
@Override
public void actionPerformed(ActionEvent e) 
{
	// TODO Auto-generated method stub
	if(!fielda.getText().equals("") && !fieldb.getText().equals("") )
	{
	int a=Integer.parseInt(fielda.getText());
	int b=Integer.parseInt(fieldb.getText());
	
	if(e.getSource()==sumb)
	{
         fieldr.setText(String.valueOf(a+b));
         
	}
	if(e.getSource()==mulb)
	{fieldr.setText(String.valueOf(a*b));
	
	}
	if(e.getSource()==divb)
		fieldr.setText(String.valueOf(a/b));

	if(e.getSource()==subb)
		fieldr.setText(String.valueOf(a-b));

	if(e.getSource()==remndrb)
		fieldr.setText(String.valueOf(a%b));
	if(e.getSource()==loge)
		fieldr.setText(String.valueOf(Math.log(a)));
	if(e.getSource()==log10)
		fieldr.setText(String.valueOf(Math.log10(a)));
	if(e.getSource()==e_power_x)
		fieldr.setText(String.valueOf(Math.exp(a)));
	if(e.getSource()==inverseb)
		fieldr.setText(String.valueOf(1/a));
	if(e.getSource()==squareroot)
		fieldr.setText(String.valueOf(Math.pow(a,0.5)));
	if(e.getSource()==a_power_x)
		fieldr.setText(String.valueOf(Math.pow(a,b)));
	if(e.getSource()==cosineb)
		fieldr.setText(String.valueOf(Math.cos(a)));
	if(e.getSource()==sineb)
		fieldr.setText(String.valueOf(Math.sin(a)));
	if(e.getSource()==tanb)
		fieldr.setText(String.valueOf(Math.tan(a)));
	}
}
}
