package com.example.madhav.heroku_volley;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    //register

    private EditText email_et,pw_et,pwc_et;
    private RequestQueue mQueue;
    String em,pw,pwc;

    //login
    private EditText email_log,pw_log;
    private RequestQueue nQueue;
    String em_l,pw_l;
     String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //mTextViewResult = findViewById(R.id.text_view_result);
        Button buttonregis = findViewById(R.id.button_regis);

        Button buttonlogin = findViewById(R.id.login);

        //register
        email_et = findViewById(R.id.email_et);
        pw_et = findViewById(R.id.pw_et);
        pwc_et = findViewById(R.id.pwc_et);

        email_et.setMaxLines(Integer.MAX_VALUE);
        email_et.setHorizontallyScrolling(false);


        //login
        email_log = findViewById(R.id.email_et_login);
        pw_log = findViewById(R.id.pw_et_login);


        mQueue = Volley.newRequestQueue(this);
        nQueue = Volley.newRequestQueue(this);


        //regis
        buttonregis.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(validate()){
                    register();
                }
            }
            private boolean validate() {
                boolean temp=true;

                em = email_et.getText().toString();
                pw = pw_et.getText().toString();
                pwc =  pwc_et.getText().toString();

                String email = email_et.getText().toString().trim();

                if (em.matches("") || pw.matches("") || pwc.matches("") ) {
                    Toast.makeText(MainActivity.this, "Fields cannot be left blank", Toast.LENGTH_SHORT).show();

                    temp=false;
                }
                else if (!email.matches(emailPattern))
                {
                    Toast.makeText(getApplicationContext(),"Invalid email address", Toast.LENGTH_SHORT).show();
                    temp=false;
                }

                if(!pw.equals(pwc)){
                    Toast.makeText(MainActivity.this,"Password Not matching",Toast.LENGTH_SHORT).show();
                    temp=false;
                }

                return temp;
            }
        });

        buttonlogin.setOnClickListener(new View.OnClickListener() {
            @Override

                public void onClick(View v) {
                    if(validatelogin()){

                        login();
                    }
                }

            private boolean validatelogin() {
                boolean temp=true;

                em_l = email_log.getText().toString();
                pw_l = pw_log.getText().toString();

                String emaill = email_log.getText().toString().trim();


                if (em_l.matches("") || pw_l.matches("") ) {
                    Toast.makeText(MainActivity.this, "Fields cannot be left blank", Toast.LENGTH_SHORT).show();
                    email_log.requestFocus();
                    temp=false;
                }
                else if (!emaill.matches(emailPattern))
                {
                    Toast.makeText(getApplicationContext(),"Invalid email address", Toast.LENGTH_SHORT).show();
                    temp=false;
                }
                return temp;
            }
        });
    }

    private void register() {
        String url = "https://bms-yoga-dev.herokuapp.com/user/signup";
        em = email_et.getText().toString();
        pw = pw_et.getText().toString();

        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        // response
                        Log.d("Response", response);
                        email_et.setText("");
                        pw_et.setText("");
                        pwc_et.setText("");
                        Toast.makeText(MainActivity.this, "User Created Successfully",
                                Toast.LENGTH_LONG).show();

                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // error
                        Log.d("Error.Response", String.valueOf(error));
                        email_et.setText("");
                        pw_et.setText("");
                        pwc_et.setText("");
                        Toast.makeText(MainActivity.this, "User Already Exists! Retry Again",
                                Toast.LENGTH_LONG).show();
                    }
                }
        ) {
            @Override
            protected Map<String, String> getParams()
            {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("email", em);
                params.put("password", pw);

                return params;
            }
        };
        mQueue.add(postRequest);
    }

    private void login() {

        //String url = "https://api.myjson.com/bins/kp9wz";
        String url = "https://bms-yoga-dev.herokuapp.com/user/login";
        em_l = email_log.getText().toString();
        pw_l = pw_log.getText().toString();
        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        // response
                        Log.d("Response", response);
                        email_log.setText("");
                        pw_log.setText("");

                        Toast.makeText(MainActivity.this, "Login Successful",
                                Toast.LENGTH_LONG).show();
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // error
                        Log.d("Error.Response", String.valueOf(error));
                        Toast.makeText(MainActivity.this, "Email or Password is Invalid",
                                Toast.LENGTH_LONG).show();
                    }
                }
        ) {
            @Override
            protected Map<String, String> getParams()
            {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("email", em_l);
                params.put("password", pw_l);

                return params;
            }
        };
        mQueue.add(postRequest);
    }
}
