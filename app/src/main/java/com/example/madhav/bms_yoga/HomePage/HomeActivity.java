package com.example.madhav.bms_yoga.HomePage;

import android.support.annotation.NonNull;

import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import com.example.madhav.bms_yoga.HomePage.dashboard;

import com.example.madhav.bms_yoga.R;

public class HomeActivity extends AppCompatActivity implements BottomNavigationView.OnNavigationItemSelectedListener{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        loadFragment(new dashboard());

        BottomNavigationView navigation = findViewById(R.id.bnavigationView);
        navigation.setOnNavigationItemSelectedListener(this);
    }
    private boolean loadFragment(Fragment fragment) {
        //switching fragment
        if (fragment != null) {
            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, fragment)
                    .commit();
            return true;
        }
        return false;
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        Fragment fragment = null;

        switch (item.getItemId()) {
            case R.id.action_dashboard:
                fragment = new dashboard();
                break;

            case R.id.action_today:
                fragment = new today();
                break;

            case R.id.action_Profile:
                fragment = new profile();
                break;

        }

        return loadFragment(fragment);
    }
}
